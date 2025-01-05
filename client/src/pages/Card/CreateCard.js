import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  {useSnackbar}  from "notistack";
import toast from "react-hot-toast";
import Layout from "./../../components/Layout/Layout";
import whatsappLogo from './../../components/Layout/whatsap.png'

const CreateCard = () => {
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [exdate, setExdate] = useState("");
    const [cvv, setCvv] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        // Validate card number
        if (!/^\d{16}$/.test(number)) {
            newErrors.number = "Card number must be exactly 16 digits long.";
            isValid = false;
        }

        // Validate name
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            newErrors.name = "Name should contain only letters and spaces.";
            isValid = false;
        }

        // Validate CVV
        if (!/^\d{3}$/.test(cvv)) {
            newErrors.cvv = "CVV must be exactly 3 digits long.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSaveCard = () => {
        if (validateForm()) {
            const data = {
                number,
                name,
                exdate,
                cvv,
            };

            axios
            .post("http://localhost:3000/cards", data)
            .then(() => {
                toast.success("Card added successfully", { variant: "success" });
                navigate("/cards/CardHome");
            })
            .catch((error) => {
                toast.error("Error saving card", { variant: "error" });
            });
        
        } else {
            enqueueSnackbar("Please fix the errors and try again", { variant: "error" });
        }
    };

    return (
        <>
        <Layout title={" Card"}>
        <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <div style={{ padding: '16px' }}>
                <h1 style={{ fontSize: '24px', marginBottom: '16px', textAlign: 'center' }}>Add Card Details</h1>

                <div
                    style={{
                        border: '1px solid #00BFFF',
                        borderRadius: '8px',
                        padding: '16px',
                        width: 'fit-content',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Number</label>
                        <input
                            type="text"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            style={{
                                width: '500px',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                boxSizing: 'border-box',
                            }}
                            maxLength={16} // Limit input to 16 characters
                        />
                        {errors.number && (
                            <div style={{ color: 'red', marginTop: '4px' }}>{errors.number}</div>
                        )}
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                boxSizing: 'border-box',
                            }}
                        />
                        {errors.name && (
                            <div style={{ color: 'red', marginTop: '4px' }}>{errors.name}</div>
                        )}
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Ex.Date</label>
                        <input
                            type="text"
                            value={exdate}
                            onChange={(e) => setExdate(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>CVV</label>
                        <input
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                boxSizing: 'border-box',
                            }}
                            maxLength={3} // Limit input to 3 characters
                        />
                        {errors.cvv && (
                            <div style={{ color: 'red', marginTop: '4px' }}>{errors.cvv}</div>
                        )}
                    </div>
                    <button
                        onClick={handleSaveCard}
                        style={{
                            padding: '10px 16px',
                            backgroundColor: '#00BFFF',
                            color: '#fff',
                            fontSize: '16px',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'block',
                            width: '100%'
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
        </Layout>
        <div class="fixed-bottom right-100 p-3" style={{ zIndex: "6", left: "initial" }}> <a href="https://wa.me/94755915168?text= Hello can you assist me ?" target="_blank"> <img src={whatsappLogo} width="60" alt="aaaa" />
</a>
</div>

        </>
    );
};

export default CreateCard;