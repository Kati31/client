import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, isAdmin }) => {
    if (!isAuthenticated) {
        // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
        return <Navigate to="/auth" replace />;
    }

    if (!isAdmin) {
        // Nếu không phải admin, chuyển hướng đến trang không có quyền
        return <Navigate to="/unauthorized" replace />;
    }
    console.log("isAuthenticated:", isAuthenticated, "isAdmin:", isAdmin);

    // Nếu đã đăng nhập và có quyền admin, hiển thị nội dung của route
    return <Outlet/>;
};

export default ProtectedRoute;