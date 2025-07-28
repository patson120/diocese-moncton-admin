

export const slugGenerator = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
        .replace(/^-|-$/g, '') // Remove leading and trailing hyphens
        .substring(0, 50); // Limit to 50 characters
}