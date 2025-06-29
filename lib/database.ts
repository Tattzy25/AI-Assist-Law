import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

// User Management Functions
export async function createUser(authProviderId: string, email: string, plan = "free") {
  try {
    const result = await sql`
      INSERT INTO users (auth_provider_id, email, plan)
      VALUES (${authProviderId}, ${email}, ${plan})
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

export async function getUserByAuthId(authProviderId: string) {
  try {
    const result = await sql`
      SELECT * FROM users WHERE auth_provider_id = ${authProviderId}
    `
    return result[0] || null
  } catch (error) {
    console.error("Error getting user by auth ID:", error)
    throw error
  }
}

export async function getUserById(userId: string) {
  try {
    const result = await sql`
      SELECT * FROM users WHERE id = ${userId}
    `
    return result[0] || null
  } catch (error) {
    console.error("Error getting user by ID:", error)
    throw error
  }
}

export async function updateUserLastLogin(userId: string) {
  try {
    await sql`
      UPDATE users SET last_login = now() WHERE id = ${userId}
    `
  } catch (error) {
    console.error("Error updating last login:", error)
    throw error
  }
}

export async function updateUserPlan(userId: string, plan: string) {
  try {
    const result = await sql`
      UPDATE users SET plan = ${plan} WHERE id = ${userId}
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error updating user plan:", error)
    throw error
  }
}

// Usage Tracking Functions
export async function getUserUsage(userId: string) {
  try {
    const result = await sql`
      SELECT * FROM user_usage WHERE user_id = ${userId}
    `
    return result[0] || null
  } catch (error) {
    console.error("Error getting user usage:", error)
    throw error
  }
}

export async function incrementUsage(userId: string, actionType: string, tokensUsed = 0, costCents = 0) {
  try {
    await sql`
      SELECT increment_usage(${userId}::UUID, ${actionType}, ${tokensUsed}, ${costCents})
    `
  } catch (error) {
    console.error("Error incrementing usage:", error)
    throw error
  }
}

export async function checkPlanLimit(userId: string, actionType: string) {
  try {
    const result = await sql`
      SELECT check_plan_limit(${userId}::UUID, ${actionType}) as allowed
    `
    return result[0]?.allowed || false
  } catch (error) {
    console.error("Error checking plan limit:", error)
    throw error
  }
}

export async function getUserStats(userId: string) {
  try {
    const result = await sql`
      SELECT * FROM get_user_stats(${userId}::UUID)
    `
    return result[0] || null
  } catch (error) {
    console.error("Error getting user stats:", error)
    throw error
  }
}

// Document Management Functions
export async function createDocument(
  userId: string,
  filename: string,
  originalFilename: string,
  fileSize: number,
  fileType: string,
  fileUrl: string,
) {
  try {
    const result = await sql`
      INSERT INTO documents (user_id, filename, original_filename, file_size, file_type, file_url)
      VALUES (${userId}, ${filename}, ${originalFilename}, ${fileSize}, ${fileType}, ${fileUrl})
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error creating document:", error)
    throw error
  }
}

export async function getUserDocuments(userId: string) {
  try {
    const result = await sql`
      SELECT * FROM documents WHERE user_id = ${userId} ORDER BY created_at DESC
    `
    return result
  } catch (error) {
    console.error("Error getting user documents:", error)
    throw error
  }
}

export async function updateDocumentAIProcessed(documentId: string, aiExtractedData: any) {
  try {
    const result = await sql`
      UPDATE documents 
      SET ai_processed = true, ai_extracted_data = ${JSON.stringify(aiExtractedData)}
      WHERE id = ${documentId}
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error updating document AI processed:", error)
    throw error
  }
}

export async function deleteDocument(documentId: string, userId: string) {
  try {
    await sql`
      DELETE FROM documents WHERE id = ${documentId} AND user_id = ${userId}
    `
  } catch (error) {
    console.error("Error deleting document:", error)
    throw error
  }
}

// Form Management Functions
export async function createForm(userId: string, formType: string, formData: any) {
  try {
    const result = await sql`
      INSERT INTO forms (user_id, form_type, form_data)
      VALUES (${userId}, ${formType}, ${JSON.stringify(formData)})
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error creating form:", error)
    throw error
  }
}

export async function getUserForms(userId: string) {
  try {
    const result = await sql`
      SELECT * FROM forms WHERE user_id = ${userId} ORDER BY created_at DESC
    `
    return result
  } catch (error) {
    console.error("Error getting user forms:", error)
    throw error
  }
}

export async function updateForm(formId: string, userId: string, formData: any, status?: string) {
  try {
    const result = await sql`
      UPDATE forms 
      SET form_data = ${JSON.stringify(formData)}, 
          status = COALESCE(${status}, status)
      WHERE id = ${formId} AND user_id = ${userId}
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error updating form:", error)
    throw error
  }
}

export async function updateFormAIAutoFilled(formId: string, userId: string, aiSuggestions: any) {
  try {
    const result = await sql`
      UPDATE forms 
      SET ai_auto_filled = true, ai_suggestions = ${JSON.stringify(aiSuggestions)}
      WHERE id = ${formId} AND user_id = ${userId}
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error updating form AI auto-filled:", error)
    throw error
  }
}

export async function deleteForm(formId: string, userId: string) {
  try {
    await sql`
      DELETE FROM forms WHERE id = ${formId} AND user_id = ${userId}
    `
  } catch (error) {
    console.error("Error deleting form:", error)
    throw error
  }
}

// AI Conversation Management Functions
export async function createAIConversation(userId: string, sessionId: string, messages: any[]) {
  try {
    const result = await sql`
      INSERT INTO ai_conversations (user_id, session_id, messages)
      VALUES (${userId}, ${sessionId}, ${JSON.stringify(messages)})
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error creating AI conversation:", error)
    throw error
  }
}

export async function updateAIConversation(sessionId: string, messages: any[], tokensUsed = 0, costCents = 0) {
  try {
    const result = await sql`
      UPDATE ai_conversations 
      SET messages = ${JSON.stringify(messages)}, 
          tokens_used = tokens_used + ${tokensUsed},
          cost_cents = cost_cents + ${costCents}
      WHERE session_id = ${sessionId}
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error updating AI conversation:", error)
    throw error
  }
}

export async function getAIConversation(sessionId: string) {
  try {
    const result = await sql`
      SELECT * FROM ai_conversations WHERE session_id = ${sessionId}
    `
    return result[0] || null
  } catch (error) {
    console.error("Error getting AI conversation:", error)
    throw error
  }
}

export async function getUserAIConversations(userId: string) {
  try {
    const result = await sql`
      SELECT * FROM ai_conversations WHERE user_id = ${userId} ORDER BY created_at DESC
    `
    return result
  } catch (error) {
    console.error("Error getting user AI conversations:", error)
    throw error
  }
}

// Firm Management Functions (White-label)
export async function createFirm(name: string, plan: string, openaiApiKey?: string, apiMode = "BYO") {
  try {
    const result = await sql`
      INSERT INTO firms (name, plan, openai_api_key, api_mode)
      VALUES (${name}, ${plan}, ${openaiApiKey || null}, ${apiMode})
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error creating firm:", error)
    throw error
  }
}

export async function getFirm(firmId: string) {
  try {
    const result = await sql`
      SELECT * FROM firms WHERE id = ${firmId}
    `
    return result[0] || null
  } catch (error) {
    console.error("Error getting firm:", error)
    throw error
  }
}

export async function updateFirm(firmId: string, updates: any) {
  try {
    const setClause = Object.keys(updates)
      .map((key) => `${key} = $${Object.keys(updates).indexOf(key) + 2}`)
      .join(", ")

    const values = [firmId, ...Object.values(updates)]

    const result = await sql`
      UPDATE firms SET ${sql.unsafe(setClause)} WHERE id = $1 RETURNING *
    `.apply(null, values)

    return result[0]
  } catch (error) {
    console.error("Error updating firm:", error)
    throw error
  }
}

export async function incrementFirmUsageGets(firmId: string, count = 1) {
  try {
    await sql`
      UPDATE firms SET usage_gets = usage_gets + ${count} WHERE id = ${firmId}
    `
  } catch (error) {
    console.error("Error incrementing firm usage gets:", error)
    throw error
  }
}

// Analytics and Admin Functions
export async function getDashboardStats(userId: string) {
  try {
    const result = await sql`
      SELECT * FROM user_dashboard_stats WHERE user_id = ${userId}
    `
    return result[0] || null
  } catch (error) {
    console.error("Error getting dashboard stats:", error)
    throw error
  }
}

export async function getSystemStats() {
  try {
    const result = await sql`
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN plan = 'free' THEN 1 END) as free_users,
        COUNT(CASE WHEN plan = 'premium' THEN 1 END) as premium_users,
        COUNT(CASE WHEN plan LIKE 'white_label%' THEN 1 END) as white_label_users,
        SUM(uu.messages_to_ai) as total_messages,
        SUM(uu.forms_auto_filled) as total_forms,
        SUM(uu.pdfs_generated) as total_pdfs,
        SUM(uu.uploads_count) as total_uploads
      FROM users u
      LEFT JOIN user_usage uu ON u.id = uu.user_id
    `
    return result[0]
  } catch (error) {
    console.error("Error getting system stats:", error)
    throw error
  }
}

export async function getUsageLogs(userId?: string, limit = 100) {
  try {
    if (userId) {
      const result = await sql`
        SELECT * FROM usage_logs 
        WHERE user_id = ${userId} 
        ORDER BY created_at DESC 
        LIMIT ${limit}
      `
      return result
    } else {
      const result = await sql`
        SELECT ul.*, u.email 
        FROM usage_logs ul
        JOIN users u ON ul.user_id = u.id
        ORDER BY ul.created_at DESC 
        LIMIT ${limit}
      `
      return result
    }
  } catch (error) {
    console.error("Error getting usage logs:", error)
    throw error
  }
}

// Plan Management Functions
export async function getPlanLimits(planName: string) {
  try {
    const result = await sql`
      SELECT * FROM plan_limits WHERE plan_name = ${planName}
    `
    return result[0] || null
  } catch (error) {
    console.error("Error getting plan limits:", error)
    throw error
  }
}

export async function getAllPlanLimits() {
  try {
    const result = await sql`
      SELECT * FROM plan_limits ORDER BY plan_name
    `
    return result
  } catch (error) {
    console.error("Error getting all plan limits:", error)
    throw error
  }
}

// Utility Functions
export async function resetMonthlyUsage() {
  try {
    await sql`
      SELECT reset_monthly_usage()
    `
  } catch (error) {
    console.error("Error resetting monthly usage:", error)
    throw error
  }
}

export async function healthCheck() {
  try {
    const result = await sql`
      SELECT 'Database connection healthy' as status, now() as timestamp
    `
    return result[0]
  } catch (error) {
    console.error("Database health check failed:", error)
    throw error
  }
}
