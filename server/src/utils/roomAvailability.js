import RoomReservation from "../models/roomReservationModel.js";

export async function getAvailableRoomIndexes(room, dates, limit = room.totalRooms) {
  await RoomReservation.init();
  const reservations = await RoomReservation.find({
    room: room._id,
    date: { $in: dates },
  }).select("roomIndex");

  const reservedIndexes = new Set(
    reservations
      .map((reservation) => reservation.roomIndex)
      .filter((roomIndex) => roomIndex >= 0 && roomIndex < room.totalRooms),
  );
  const availableIndexes = [];

  for (
    let roomIndex = 0;
    roomIndex < room.totalRooms && availableIndexes.length < limit;
    roomIndex += 1
  ) {
    if (!reservedIndexes.has(roomIndex)) availableIndexes.push(roomIndex);
  }

  return availableIndexes;
}

export async function withRoomAvailability(rooms, dates) {
  if (rooms.length === 0) return [];

  const reservations = await RoomReservation.find({
    room: { $in: rooms.map((room) => room._id) },
    date: { $in: dates },
  }).select("room roomIndex");

  const reservedByRoom = new Map();
  reservations.forEach((reservation) => {
    const roomId = String(reservation.room);
    if (!reservedByRoom.has(roomId)) reservedByRoom.set(roomId, new Set());
    reservedByRoom.get(roomId).add(reservation.roomIndex);
  });

  return rooms.map((room) => {
    const roomData = room.toObject();
    const totalRooms = Number(room.totalRooms) || 0;
    const reservedIndexes = reservedByRoom.get(String(room._id)) || new Set();
    const reservedCount = [...reservedIndexes].filter(
      (roomIndex) => roomIndex >= 0 && roomIndex < totalRooms,
    ).length;

    return {
      ...roomData,
      availableRooms:
        room.status === "available"
          ? Math.max(0, totalRooms - reservedCount)
          : 0,
    };
  });
}
