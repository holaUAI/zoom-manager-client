export function parseLatamDateTime(dateStr) {
    if (!dateStr || typeof dateStr !== "string") return null;

    const [datePart, timePart] = dateStr.split(", ");
    if (!datePart || !timePart) return null;

    const [day, month, year] = datePart.split("/");
    const [hour, minute] = timePart.split(":");

    return new Date(`${year}-${month}-${day}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`);
}
