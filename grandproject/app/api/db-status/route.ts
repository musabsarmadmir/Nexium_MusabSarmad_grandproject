import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

    // Check if tables exist
    const { data: tables, error } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
      .in("table_name", ["profiles", "journal_entries", "chat_messages"])

    if (error) throw error

    const tableNames = tables?.map((t) => t.table_name) || []
    const requiredTables = ["profiles", "journal_entries", "chat_messages"]
    const missingTables = requiredTables.filter((table) => !tableNames.includes(table))

    return Response.json({
      success: missingTables.length === 0,
      tables: tableNames,
      missingTables,
      message: missingTables.length === 0 ? "All required tables exist" : `Missing tables: ${missingTables.join(", ")}`,
    })
  } catch (error: any) {
    return Response.json({
      success: false,
      error: error.message,
      message: "Database connection failed",
    })
  }
}
