const fakeAuthProvider = {
    isAuthenticated: false,
    signin(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = true;
        setTimeout(callback, 100); // fake async
    },
    signout(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    },
};

const auth = async (token) => {
    console.log(token)

    const response = await fetch('/api/get');

    if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
    }

    return response.json();
}

export { fakeAuthProvider, auth };