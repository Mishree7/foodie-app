import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // If no user or user is not admin, redirect to login
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
}