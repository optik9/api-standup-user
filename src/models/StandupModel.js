const { query } = require('../config/db');

class StandupModel {
  static async getByUserId(userId) {
    const sql = `
      SELECT 
        u.id as id_user,
        u.name AS user_name,
        u.status AS status,
        u.location as location, 
        p.name AS project_name,
        s.*
      FROM 
        standup_standupmodel s
      JOIN 
        Project_member pm ON s.user_project_id = pm.id
      JOIN 
        project p ON pm.project_id = p.id
      JOIN 
        "user" u ON pm.user_id = u.id
      WHERE 
        u.id = $1
      ORDER BY
        s.created_at DESC;
    `;

    const { rows } = await query(sql, [userId]);
    return rows;
  }

  static async getAllUsers(filters = {}) {
    let sql = `
      SELECT 
        id,
        name,
        status,
        location
      FROM "user"
    `;

    const whereClauses = [];
    const params = [];
    
    // Construir filtros dinámicos
    if (filters.status) {
      whereClauses.push(`status = $${whereClauses.length + 1}`);
      params.push(filters.status);
    }
    
    if (filters.location) {
      whereClauses.push(`location = $${whereClauses.length + 1}`);
      params.push(filters.location);
    }

    if (whereClauses.length > 0) {
      sql += ` WHERE ${whereClauses.join(' AND ')}`;
    }

    sql += ` ORDER BY name ASC`;

    const { rows } = await query(sql, params);
    return rows;
  }
}

module.exports = StandupModel;