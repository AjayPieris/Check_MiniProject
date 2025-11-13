const pool = require("../config/database");

const Tour = {
  // ✅ Create new tour
  async create(tourData) {
    try {
      const {
        provider_id,
        title,
        description,
        price,
        duration_hours,
        location,
        district,
        category,
        max_group_size,
        images = [],
        itinerary,
        sustainability_info,
        safety_badge_required = false,
      } = tourData;

      const query = `
        INSERT INTO tours (
          provider_id, title, description, price, duration_hours, 
          location, district, category, max_group_size, images,
          itinerary, sustainability_info, safety_badge_required
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING *
      `;

      const values = [
        provider_id,
        title,
        description,
        price,
        duration_hours,
        location,
        district,
        category,
        max_group_size,
        images,
        itinerary,
        sustainability_info,
        safety_badge_required,
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating tour:", error);
      throw error;
    }
  },

  // ✅ Get all tours (with optional filters)
  async findAll(filters = {}) {
    try {
      let query = `
        SELECT t.*, 
               u.first_name, u.last_name, u.badge_status, 
               u.profile_picture AS guide_image
        FROM tours t
        JOIN users u ON t.provider_id = u.user_id
        WHERE t.availability = true
      `;

      const values = [];
      let paramCount = 0;

      // --- Filtering Options ---
      if (filters.location) {
        paramCount++;
        query += ` AND (LOWER(t.location) LIKE LOWER($${paramCount}) OR LOWER(t.district) LIKE LOWER($${paramCount}))`;
        values.push(`%${filters.location}%`);
      }

      if (filters.category) {
        paramCount++;
        query += ` AND t.category = $${paramCount}`;
        values.push(filters.category);
      }

      if (filters.maxPrice) {
        paramCount++;
        query += ` AND t.price <= $${paramCount}`;
        values.push(filters.maxPrice);
      }

      if (filters.minPrice) {
        paramCount++;
        query += ` AND t.price >= $${paramCount}`;
        values.push(filters.minPrice);
      }

      if (filters.duration) {
        paramCount++;
        query += ` AND t.duration_hours <= $${paramCount}`;
        values.push(filters.duration);
      }

      if (filters.safety_badge === "true") {
        query += ` AND u.badge_status = 'verified'`;
      }

      if (filters.provider_id) {
        paramCount++;
        query += ` AND t.provider_id = $${paramCount}`;
        values.push(filters.provider_id);
      }

      query += " ORDER BY t.created_at DESC";

      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error("Error fetching tours:", error);
      throw error;
    }
  },

  // ✅ Get tour by ID
  async findById(tourId) {
  try {
    const query = `
      SELECT 
        t.*,
        u.first_name, 
        u.last_name, 
        u.profile_picture, 
        u.badge_status, 
        u.phone AS guide_phone
      FROM tours t
      JOIN users u ON t.provider_id = u.user_id
      WHERE t.tour_id = $1
      LIMIT 1
    `;

    const result = await pool.query(query, [parseInt(tourId)]);

    // If no result found
    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error fetching tour by ID:", error);
    throw error;
  }
},


  // ✅ Update tour
  async update(tourId, updateData) {
  try {
    // Build dynamic query
    const setClauses = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(updateData)) {
      // Skip undefined or null
      if (value !== undefined) {
        setClauses.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    }

    // Always update the updated_at timestamp
    setClauses.push(`updated_at = CURRENT_TIMESTAMP`);

    if (setClauses.length === 1) {
      throw new Error("No valid fields to update");
    }

    const query = `
      UPDATE tours
      SET ${setClauses.join(", ")}
      WHERE tour_id = $${paramCount}
      RETURNING *
    `;

    values.push(tourId);

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating tour:", error);
    throw error;
  }
},

  // ✅ Delete tour
  async delete(tourId) {
    try {
      const query = "DELETE FROM tours WHERE tour_id = $1 RETURNING *";
      const result = await pool.query(query, [tourId]);
      return result.rows[0];
    } catch (error) {
      console.error("Error deleting tour:", error);
      throw error;
    }
  },

  //get tour by provider
  async getByProvider(providerId) {
  try {
    const query = `
      SELECT 
        t.*, 
        u.first_name, 
        u.last_name, 
        u.profile_picture AS guide_image
      FROM tours t
      JOIN users u ON t.provider_id = u.user_id
      WHERE t.provider_id = $1
      ORDER BY t.created_at DESC;
    `;
    const result = await pool.query(query, [providerId]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching tours by provider:", error);
    throw error;
  }
},


  // ✅ Get tour count by district
  async getToursByDistrict() {
    try {
      const query = `
        SELECT district, COUNT(*) AS tour_count
        FROM tours 
        WHERE availability = true
        GROUP BY district
        ORDER BY tour_count DESC
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error grouping tours by district:", error);
      throw error;
    }
  },
};

module.exports = Tour;
