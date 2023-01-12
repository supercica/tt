import React, { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/inertia-react';

export default function DeleteUserForm({ className }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Brisanje naloga</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Kada se vaš nalog izbriše, svi njegovi resursi i podaci biće trajno izbrisani. Molimo vas
                    unesite svoju lozinku da biste potvrdili da želite da trajno izbrišete svoj nalog.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Obriši nalog</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Da li ste sigurni da želite da izbrišete svoj nalog?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Kada se vaš nalog izbriše, svi njegovi resursi i podaci biće trajno izbrisani. Molimo vas
                        unesite svoju lozinku da biste potvrdili da želite da trajno izbrišete svoj nalog.
                    </p>

                    <div className="mt-6">
                        <InputLabel for="password" value="Lozinka" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            handleChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Odustani</SecondaryButton>

                        <DangerButton className="ml-3" processing={processing}>
                            Obriši nalog
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
