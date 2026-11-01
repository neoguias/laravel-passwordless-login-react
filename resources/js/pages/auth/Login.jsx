import { Head, useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { Captcha } from '@laracaptcha/react';

/**
 * El formulario del email. `captcha` es lo que devuelve Captcha::props() en el servidor:
 * proveedor, clave pública y script.
 */
export default function Login({ captcha }) {
    const { data, setData, post, processing, errors } = useForm({ email: '', captcha: '' });
    const captchaWidget = useRef(null);

    function submit(event) {
        event.preventDefault();

        post('/login', {
            // Cloudflare acepta cada token una sola vez: si el servidor rechaza el envío, hace falta otro.
            onError: () => captchaWidget.current?.reset(),
        });
    }

    return (
        <>
            <Head title="Entrar" />

            <main className="card">
                <h1>Entrar</h1>
                <p className="lead">Sin contraseña: te enviamos un código a tu email.</p>

                <form onSubmit={submit}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" value={data.email} onChange={(event) => setData('email', event.target.value)} required autoFocus autoComplete="username" maxLength={255} />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <Captcha ref={captchaWidget} {...captcha} language="es" onToken={(token) => setData('captcha', token)} />
                    {errors.captcha && <p className="error">{errors.captcha}</p>}

                    <button type="submit" disabled={processing}>
                        {processing ? 'Enviando…' : 'Enviarme el código'}
                    </button>
                </form>

                <p className="hint">¿Aún no tienes cuenta? Escribe tu email: el mismo formulario la crea.</p>
            </main>
        </>
    );
}
