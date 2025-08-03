// auth.js
const auth0Client = await createAuth0Client({
    domain: 'dev-ehr7m7wodyif1p1h.us.auth0.com', // Replace with your Auth0 domain
    clientId: 'QbocdruzwnkjfHwVyrqHm4UT5SicsMnD', // Replace with your Auth0 Client ID
    authorizationParams: {
        redirect_uri: window.location.origin
    }
});

const updateUI = async () => {
    const isAuthenticated = await auth0Client.isAuthenticated();
    if (isAuthenticated) {
        // User is logged in, redirect to app.html
        window.location.replace('/app.html');
    } else {
        // User is not logged in, keep them on the login page
        console.log('User is not authenticated.');
    }
};

const handleRedirect = async () => {
    const query = window.location.search;
    if (query.includes('code=') && query.includes('state=')) {
        await auth0Client.handleRedirectCallback();
        window.history.replaceState({}, document.title, '/');
        updateUI();
    }
};

window.onload = async () => {
    await handleRedirect();
    updateUI();

    document.getElementById('login-button').addEventListener('click', () => {
        auth0Client.loginWithRedirect();
    });
};
