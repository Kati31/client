function NotAdmin(params) {
    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ height: "100vh", textAlign: "center" }}
        >
            <div>
                <h1 style={{ color: "red", fontWeight: "bold" }}>
                    KHÔNG THỂ TRUY CẬP VÀO MỤC NÀY!
                </h1>
                <p style={{ color: "red", fontWeight: "bold" }}>
                    Mục này chỉ admin mới có quyền sử dụng. Bạn không có quyền truy cập vào mục này khi không phải admin! Vui lòng rời khỏi trang web này.
                </p>
            </div>
        </div>
    );
}

export default NotAdmin;