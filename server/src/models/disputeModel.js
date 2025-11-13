import pool from "../config/database.js";

export const Dispute = {
  async create(data) {
    const { booking_id, complainant_id, accused_id, type, description } = data;
    const query = `
      INSERT INTO disputes (booking_id, complainant_id, accused_id, type, description)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [booking_id, complainant_id, accused_id, type, description];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findById(disputeId) {
    const query = `
      SELECT d.*, 
             c.first_name AS complainant_first_name, c.last_name AS complainant_last_name,
             a.first_name AS accused_first_name, a.last_name AS accused_last_name,
             b.tour_id
      FROM disputes d
      JOIN users c ON d.complainant_id = c.user_id
      JOIN users a ON d.accused_id = a.user_id
      JOIN bookings b ON d.booking_id = b.booking_id
      WHERE d.dispute_id = $1
    `;
    const result = await pool.query(query, [disputeId]);
    return result.rows[0];
  },

  async getAll(filters = {}) {
    let query = `
      SELECT d.*, 
             c.first_name AS complainant_first_name, c.last_name AS complainant_last_name,
             a.first_name AS accused_first_name, a.last_name AS accused_last_name
      FROM disputes d
      JOIN users c ON d.complainant_id = c.user_id
      JOIN users a ON d.accused_id = a.user_id
      WHERE 1=1
    `;
    const values = [];
    let paramCount = 0;

    if (filters.status) {
      paramCount++;
      query += ` AND d.status = $${paramCount}`;
      values.push(filters.status);
    }

    query += " ORDER BY d.created_at DESC";
    const result = await pool.query(query, values);
    return result.rows;
  },

  async update(disputeId, data) {
    const { status, resolution } = data;
    const query = `
      UPDATE disputes
      SET status = $1, resolution = $2, resolved_at = CURRENT_TIMESTAMP
      WHERE dispute_id = $3
      RETURNING *
    `;
    const values = [status, resolution, disputeId];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async delete(disputeId) {
    const query = "DELETE FROM disputes WHERE dispute_id = $1 RETURNING *";
    const result = await pool.query(query, [disputeId]);
    return result.rows[0];
  }
};
