import { useState, useMemo, useEffect } from "react";
import { api } from "../../api/axios";

import DeactiveSection from "../componets/UserManagement/DeactiveSection";
import BookingHistory from "../componets/UserManagement/BookingHistory";
import UpdateUser from "../componets/UserManagement/UpdateUser";
import ViewProfile from "../componets/UserManagement/ViewProfile";
import UserTable from "../componets/UserManagement/UserTable";
import Header from "../componets/UserManagement/Header";

const ROLE_LABELS = {
  admin: "Administrator",
  user: "Standard Guest",
  hotel: "Property Owner",
};

export default function UserManagementTab() {
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Active Modals & Selected User State
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'profile' | 'edit' | 'history' | 'delete'
  // Edit Form Inputs
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    let isCurrent = true;

    async function loadUsers() {
      try {
        const { data } = await api.get("/admin/users");
        const fetchedUsers = data.users.map((user) => ({
          ...user,
          id: String(user.id),
          role: ROLE_LABELS[user.role] ?? user.role,
          status: "Active",
          totalBookings: 0,
          totalSpent: "$0",
          lastLogin: "—",
          bookingHistory: [],
        }));

        if (isCurrent) {
          setUsers(fetchedUsers);
        }
      } catch (error) {
        console.error("Failed to load users:", error);
        if (isCurrent) {
          setLoadError(
            error.response?.data?.message ||
              "Could not load users. Please try again.",
          );
        }
      } finally {
        if (isCurrent) {
          setIsLoadingUsers(false);
        }
      }
    }

    loadUsers();
    return () => {
      isCurrent = false;
    };
  }, []);

  // Filter Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "All" || u.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [users, searchQuery, statusFilter]);

  // Account Status Handlers
  const toggleBlockUser = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === "Blocked" ? "Active" : "Blocked";
          return { ...u, status: nextStatus };
        }
        return u;
      }),
    );
  };

  const deactivateUser = (userId) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: "Deactivated" } : u)),
    );
    setActiveModal(null);
  };

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
    setActiveModal("edit");
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? { ...u, ...editForm } : u)),
    );
    setActiveModal(null);
  };

  return (
    <div className="space-y-6 text-zinc-100">
      {/* 1. SECTION HEADER & SEARCH FILTER BAR */}
      <Header
        statusFilter={statusFilter}
        setSearchQuery={setSearchQuery}
        setStatusFilter={setStatusFilter}
        searchQuery={searchQuery}
      />
      {/* 2. MAIN USERS DATA TABLE */}
      {isLoadingUsers ? (
        <p className="py-12 text-center text-zinc-400">Loading users...</p>
      ) : loadError ? (
        <p role="alert" className="py-12 text-center text-red-400">
          {loadError}
        </p>
      ) : (
        <UserTable
          filteredUsers={filteredUsers}
          setActiveModal={setActiveModal}
          setSelectedUser={setSelectedUser}
          handleOpenEdit={handleOpenEdit}
          toggleBlockUser={toggleBlockUser}
        />
      )}
      {/* ------------------------------------------------------------------ */}
      {/* MODAL 1: VIEW PROFILE MODAL                                        */}
      {/* ------------------------------------------------------------------ */}
      {activeModal === "profile" && selectedUser && (
        <ViewProfile
          selectedUser={selectedUser}
          setActiveModal={setActiveModal}
        />
      )}
      {/* ------------------------------------------------------------------ */}
      {/* MODAL 2: EDIT PERMITTED USER INFORMATION                           */}
      {/* ------------------------------------------------------------------ */}
      {activeModal === "edit" && selectedUser && (
        <UpdateUser
          userId={selectedUser.id}
          setActiveModal={setActiveModal}
          editForm={editForm}
          handleSaveEdit={handleSaveEdit}
          setEditForm={setEditForm}
        />
      )}
      {/* ------------------------------------------------------------------ */}
      {/* MODAL 3: VIEW USER BOOKING HISTORY DRAWER                          */}
      {/* ------------------------------------------------------------------ */}
      {activeModal === "history" && selectedUser && (
        <BookingHistory
          selectedUser={selectedUser}
          setActiveModal={setActiveModal}
        />
      )}
      {/* ------------------------------------------------------------------ */}
      {/* MODAL 4: DEACTIVATE / RETENTION POLICY CONFIRMATION                */}
      {/* ------------------------------------------------------------------ */}
      {activeModal === "delete" && selectedUser && (
        <DeactiveSection
          selectedUser={selectedUser}
          setActiveModal={setActiveModal}
          deactivateUser={deactivateUser}
        />
      )}
    </div>
  );
}
