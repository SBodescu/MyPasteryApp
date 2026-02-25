import InventoryManager from '../../components/InventoryManager/InventoryManager';
import './AdminDashboard.scss';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard-content">
      <h1>Inventory Manager</h1>
      <p>Manage all products in the inventory.</p>
      <InventoryManager />
    </div>
  );
}
