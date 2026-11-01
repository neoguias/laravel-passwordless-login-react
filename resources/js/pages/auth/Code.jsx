import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Code({ email }) {
    const { status } = usePage().props;
    const form = useForm({ code: '' });
    const resend = useForm({});

    function submit(event) {
        event.preventDefault();

        form.post('/login/codigo');
    }

    function sendAnother() {
        resend.post('/login/codigo/reenviar', {
            onSuccess: () => form.reset('code'),
        });
    }

    const error = form.errors.code || resend.errors.code;

    return (
        <>
            <Head title="Revisa tu correo" />

            <main className="card">
                {status && <p className="notice" role="status">{status}</p>}

                <h1>Revisa tu correo</h1>
                <p className="lead">Te hemos enviado seis cifras a <strong>{email}</strong>.</p>

                <form onSubmit={submit}>
                    <label htmlFor="code">Código</label>
                    <input id="code" type="text" value={form.data.code} onChange={(event) => form.setData('code', event.target.value)} required autoFocus inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} placeholder="000000" className="code" />
                    {error && <p className="error">{error}</p>}

                    <button type="submit" disabled={form.processing}>
                        {form.processing ? 'Comprobando…' : 'Entrar'}
                    </button>
                </form>

                <div className="actions">
                    <Link href="/login">Usar otro email</Link>
                    <button type="button" className="link" disabled={resend.processing} onClick={sendAnother}>Enviar otro código</button>
                </div>

                <p className="hint">Caduca en diez minutos y solo sirve una vez. Si no lo ves, mira en spam.</p>
            </main>
        </>
    );
}
