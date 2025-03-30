const knex = require("../database/knex");

exports.login = async (req, res) => {
  const { user_username, user_password } = req.body;

  try {
    // Tìm user theo username
    const user = await knex("User")
      .select("user_id", "user_username", "user_role", "user_name")
      .where("user_username", user_username)
      .first();

    // Kiểm tra tồn tại user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Tài khoản không tồn tại",
      });
    }

    // Kiểm tra password (tạm thời so sánh trực tiếp)
    if (user_password !== user.user_password) {
      return res.status(401).json({
        success: false,
        message: "Mật khẩu không chính xác",
      });
    }

    // Đăng nhập thành công
    res.json({
      success: true,
      message: "Đăng nhập thành công",
      user: {
        id: user.user_id,
        username: user.user_username,
        name: user.user_name,
        role: user.user_role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};
