import React from 'react';
import { X } from 'lucide-react';
import { TabButton } from './FormField';

const Header = ({ currentScreen, setCurrentScreen }) => {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className=" mx-auto  flex justify-between items-center h-14">
                <div className="flex h-full ">
                    <TabButton
                        label="New Patient Registration"
                        active={true}
                        isMain
                        onClick={() => setCurrentScreen('register')}
                    />
                    <div className="flex items-center px-6 border-l border-gray-200">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold mr-2">1</div>
                        <span className="text-sm font-medium text-gray-700">Incoming ABHA Consent</span>
                    </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={20} className="text-gray-400" />
                </button>
            </div>
        </header>
    );
};

export default Header;
