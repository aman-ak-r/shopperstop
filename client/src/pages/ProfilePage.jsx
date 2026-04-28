import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import PageBanner from "../components/PageBanner";
import { saveProfile } from "../redux/slices/authSlice";
import { getErrorMessage } from "../utils/helpers";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, profileLoading } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: user?.name || "",
    avatar: user?.avatar || "",
    address: {
      fullName: user?.address?.fullName || user?.name || "",
      phone: user?.address?.phone || "",
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      pincode: user?.address?.pincode || "",
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.startsWith("address.")) {
      const addressKey = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressKey]: value,
        },
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(saveProfile(form)).unwrap();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="space-y-8">
      <PageBanner
        title="Your Profile"
        description="Manage your account details and saved delivery address."
      />

      <form onSubmit={handleSubmit} className="card mx-auto max-w-4xl p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <input className="input" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
          <input className="input" type="email" value={user?.email || ""} disabled />
          <input className="input sm:col-span-2" name="avatar" value={form.avatar} onChange={handleChange} placeholder="Avatar URL (optional)" />
          <input className="input" name="address.fullName" value={form.address.fullName} onChange={handleChange} placeholder="Delivery Name" />
          <input className="input" name="address.phone" value={form.address.phone} onChange={handleChange} placeholder="Phone Number" />
          <input className="input sm:col-span-2" name="address.street" value={form.address.street} onChange={handleChange} placeholder="Street Address" />
          <input className="input" name="address.city" value={form.address.city} onChange={handleChange} placeholder="City" />
          <input className="input" name="address.state" value={form.address.state} onChange={handleChange} placeholder="State" />
          <input className="input" name="address.pincode" value={form.address.pincode} onChange={handleChange} placeholder="Pincode" />
        </div>

        <button type="submit" className="button-primary mt-6" disabled={profileLoading}>
          {profileLoading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
