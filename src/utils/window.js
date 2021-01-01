export const getURLHash = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((acc, val) => {
            if (val) {
                const parts = val.split('=');
                acc[parts[0]] = decodeURIComponent(parts[1]);
            }

            return acc;
        }, {});
};
