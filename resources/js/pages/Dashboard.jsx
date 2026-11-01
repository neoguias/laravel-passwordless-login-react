import { Head, router, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { user } = usePage().props.auth;

    return (
        <>
            <Head title="Panel" />

            <main className="card">
                <h1>Hola, {user.name}</h1>
                <p className="lead">Has entrado como <strong>{user.email}</strong>, sin contraseña.</p>

                <button type="button" onClick={() => router.post('/logout')}>Cerrar sesión</button>
            </main>
        </>
    );
}
