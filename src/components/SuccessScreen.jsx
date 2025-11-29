import React, { useMemo } from 'react';
import {
    Check,
    Printer,
    FileText,
    CreditCard
} from 'lucide-react';
import { FaPaypal } from "react-icons/fa";

const generateRandomID = (prefix) => `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
const generateTransactionID = () => `#${Math.floor(100000000000 + Math.random() * 900000000000)}`;

const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).format(date);
};

const SuccessScreen = ({ data }) => {
    const uhid = useMemo(() => generateRandomID("IIGH"), []);
    const billNo = useMemo(() => generateRandomID("FB"), []);
    const txnRef = useMemo(() => generateTransactionID(), []);
    const dateStr = useMemo(() => formatDate(new Date()), []);

    const ActionButton = ({ icon: Icon, label, primary }) => (
        <button className={`
      flex flex-col items-center justify-center w-32 h-24 border rounded-lg transition-all
      ${primary
                ? 'border-blue-500 bg-white text-gray-800 hover:bg-blue-50 ring-1 ring-blue-500'
                : 'border-gray-200 bg-white text-gray-800 hover:border-gray-400 hover:shadow-sm'
            }
    `}>

            <Icon size={20} className="mb-2 text-gray-800" />
            <span className="text-xs font-medium">{label}</span>
        </button>
    );

    return (
        <div className="bg-white min-h-screen p-10 flex flex-col items-center">


            <div className="w-full border-2 border-dashed border-gray-200 rounded-lg p-[16px]  bg-white relative">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Service Order Status</h2>

                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Patient Registration Successfull.</h1>
                    <div className="bg-green-100 rounded-full p-1">
                        <Check className="text-green-500 w-5 h-5" strokeWidth={4} />
                    </div>
                </div>

                <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium w-24">UHID No :</span>
                        <span className="font-bold text-gray-800">{uhid}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium w-24">Bill No :</span>
                        <span className="font-bold text-gray-800">{billNo}</span>
                    </div>
                </div>

                <div className="space-y-1 text-xs text-gray-400  border-t border-gray-100 pt-4">
                    <p>Created at {dateStr} by Abhijeet Das</p>
                    <p>Transaction Ref No {txnRef}</p>
                </div>
            </div>


            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">

                <ActionButton icon={CreditCard} label="View Profile" primary />


                <ActionButton icon={Printer} label="Print Receipt" />


                <ActionButton icon={FileText} label="Print UHID Card" />


                <ActionButton icon={FaPaypal} label="Pay via PayPal" />
            </div>

        </div>
    );
};

export default SuccessScreen;