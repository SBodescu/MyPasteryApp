import { useEffect, useState } from 'react';
import InventoryManager from '../components/InventoryManager/InventoryManager';

export default function Admin(){
    return (
        <div>
            <h1>Admin Page</h1>
            <p>Only accessible to admin users.</p>
            <InventoryManager />
        </div>
    );
}