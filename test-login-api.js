async function testLogin() {
    const credentials = {
        email: "admin@inamsos.go.id",
        password: "admin123"
    };

    console.log("Testing login with:", credentials.email);

    try {
        const response = await fetch("http://localhost:3001/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.ok) {
            console.log("SUCCESS: Login berhasil!");
            console.log("User:", data.user ? data.user.name : "Unknown");
            console.log("Role:", data.user ? data.user.role : "Unknown");
        } else {
            console.log("FAILED: Login gagal!");
            console.log("Status Code:", response.status);
            console.log("Response:", JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("ERROR: Gagal menghubungi server:", error.message);
    }
}

testLogin();
