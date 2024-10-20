const Admin = require("../models/Admin");
const md5 = require('md5')

const addAdmin = async (adminObj) => {
  adminObj.loginPwd = md5(adminObj.loginPwd)
  const ins = await Admin.create(adminObj);
  return ins.toJSON();
};

const updateAdmin =  async (id, adminObj) => {
  if (adminObj.loginPwd) {
    adminObj.loginPwd = md5(adminObj.loginPwd)
  }
  const result = await Admin.update(adminObj, {
    where: {
      id
    }
  })
  return result
};

const deleteAdmin = async(adminId) => {
  const result = await Admin.destroy({
    where: {
      id: adminId
    }
  })
  return result
};

const queryAdmin = async ({ loginId, loginPwd }) => {
  loginPwd = md5(loginPwd)
  const result = await Admin.findOne({
    where: {
      loginId,
      loginPwd
    }
  })
  if (!result) return
  if (result.loginId === loginId && result.loginPwd === loginPwd) {
    return result
  }
}


const getAdminByLoginId = async ({ loginId, loginPwd }) => {
  const result = await Admin.findOne({
    where: { loginId }
  })
  if (!result) return
  return result.toJSON()
}


const getAdminById = async (id) => {
  const result = await Admin.findByPk(id)
  if (result) {
    return result.toJSON()
  }
}

module.exports = {
  addAdmin,
  updateAdmin,
  deleteAdmin,
  queryAdmin,
  getAdminById,
  getAdminByLoginId,
}


