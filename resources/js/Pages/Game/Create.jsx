import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head, Link, useForm} from '@inertiajs/inertia-react';
import {Inertia} from "@inertiajs/inertia";
import InputLabel from "@/Components/InputLabel";
import Select from "react-select";
import PrimaryButton from "@/Components/PrimaryButton";

function Create(props) {
    const [selectedOption, setSelectedOption] = useState(null)
    const {data, setData, post, processing, errors, reset} = useForm({
        date: '',
        winner: '',
        location: '',
        p1: '',
        p2: '',
        g1: '',
        g2: ''
    });
    let igraci = []
    props.igraci.map(igrac => {
            igraci.push({
                value: igrac.id,
                label: igrac.nickname
            })
        }
    )
    let lokacije = []
    props.lokacije.map(lokacija => {
            lokacije.push({
                value: lokacija.id,
                label: lokacija.name
            })
        }
    )
    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('games.store', data));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800  leading-tight">Unesi novu
                igru</h2>}
        >
            <Head title="Unesi novu igru"/>

            <div className="sm:px-6 mt-6 w-full">
                <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                    <form onSubmit={handleSubmit}>
                        <div className="my-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-2/3">
                        <InputLabel forInput="datum" value="Datum meča"/>
                        <input type="date" name="datum" value={data.date}
                               onChange={e => setData("date", e.target.value)}/>
                            </div>
                        </div>
                        <div className="mxy-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-2/3">
                        <InputLabel forInput="lokacija" value="Lokacija"/>
                        <Select options={lokacije}
                                defaultValue={selectedOption}
                                onChange={selectedOption => setData('location', selectedOption)}/>
                            </div>
                        </div>
                        <div className="my-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-2/3">
                            <InputLabel forInput="p1" value="Igrač 1"/>
                            <Select options={igraci}
                                    defaultValue={selectedOption} onChange={selectedOption => setData('p1', selectedOption)}
                            />
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <InputLabel forInput="g1" value="Igrac 1 gems"/>
                            <input type="number" name="g1"
                                   onChange={e => setData("g1", e.target.value)}/>
                        </div>
                        </div>
                        <div className="my-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-2/3">
                            <InputLabel forInput="p2" value="Igrač 2"/>
                            <Select options={igraci}
                                    defaultValue={selectedOption} onChange={selectedOption => setData('p2', selectedOption)}
                            />
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <InputLabel forInput="g2" value="Igrac 2 gems"/>
                            <input type="number" name="g2"
                                   onChange={e => setData("g2", e.target.value)}/>
                        </div>
                        </div>


                        <PrimaryButton>Unesi meč</PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Create;
