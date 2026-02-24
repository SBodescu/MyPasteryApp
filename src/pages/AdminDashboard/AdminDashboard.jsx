import InventoryManager from '../../components/InventoryManager/InventoryManager';
import './AdminDashboard.scss';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard-content">
      <h1>Admin Page</h1>
      <p>Only accessible to admin users.</p>
      <InventoryManager />
    </div>
  );
}
