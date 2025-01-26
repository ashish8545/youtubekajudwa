// Converts UTC Timestamp to Number of days ago
export const convertUtcToDaysAgo = (utcTimestamp) => {
    const currentDate = new Date(); // Current date and time
    const utcDate = new Date(utcTimestamp); // Convert UTC timestamp to Date object

    // Calculate the difference in milliseconds
    const diffInMillis = currentDate - utcDate;

    // Convert milliseconds to days
    const daysDifference = diffInMillis / (1000 * 60 * 60 * 24);

    // If the difference is less than 1 day, calculate the number of hours
    if (daysDifference < 1) {
        const hoursDifference = diffInMillis / (1000 * 60 * 60); // Convert to hours
        if (hoursDifference < 1) {
            const minsDifference = diffInMillis / (1000 * 60); // Convert to minutes
            return Math.floor(minsDifference) + " minutes ago"; // Return the number of minutes (rounded down)
        }
        return Math.floor(hoursDifference) + " hours ago"; // Return the number of hours (rounded down)
    }

    // Return the whole number of days (rounded down)
    return Math.floor(daysDifference) === 1 ? Math.floor(daysDifference) + " day ago" : Math.floor(daysDifference) + " days ago";
}

// Converts thounds to 1K
export const convertNumberToK = (num) => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + "B"; // Format for billions (1B)
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M"; // Format for millions (1M)
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + "K"; // Format for thousands (1k)
    }
    return num.toString();
}