const SQL = {
	SELECT_EMP_BY_COMPANYID: `SELECT * FROM HR_EMP WHERE COMPANYID=?`,
};

const getEmployees = (pool, req, res) => {
	pool.query(SQL.SELECT_EMP_BY_COMPANYID, [req.params.companyID], function (err, result) {
		if (err) throw err;
		res.status(200).json({ employees: result.map((emp) => emp.NAME) });
	});
};

module.exports = { getEmployees };
