'use client';
import { useEffect, useState } from "react";

export default function FillFormPage({ params }) {
    const [form, setForm] = useState(null);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        fetch(`/api/forms/${params.id}/`)
            .then(res => res.json())
            .then(data => setForm(data));
    }, []);

    if (!form) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">{form.title}</h1>

            {form.fields.map(f => (
                <div key={f.id} className="my-3">
                    <label className="block mb-1">{f.label}</label>

                    {f.type === "text" && (
                        <input
                            className="border px-2 py-1 rounded-md"
                            onChange={(e)=> setAnswers({...answers, [f.id]: e.target.value })}
                        />
                    )}

                    {f.type === "number" && (
                        <input
                            type="number"
                            className="border px-2 py-1 rounded-md"
                            onChange={(e)=> setAnswers({...answers, [f.id]: e.target.value })}
                        />
                    )}
                </div>
            ))}

            <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={async () => {
                    await fetch(`/api/forms/${params.id}/submit/`, {
                        method: "POST",
                        body: JSON.stringify({
                            answers: Object.keys(answers).map(k => ({
                                field: k,
                                value: answers[k]
                            }))
                        })
                    });
                    alert("Submitted!");
                }}
            >
                Submit
            </button>
        </div>
    );
}
