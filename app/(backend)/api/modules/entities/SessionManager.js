import { createClient } from "./Supabase";

class SessionManager {
  constructor() {
    this.sessionCache = null;
    this.lastFetchTime = null;
    this.cacheDuration = 5 * 60 * 1000; // 5 minutes
  }

  async getSession() {
    const now = Date.now();
    
    // Return cached session if still valid
    if (
      this.sessionCache && 
      this.lastFetchTime && 
      now - this.lastFetchTime < this.cacheDuration
    ) {
      return this.sessionCache;
    }
    
    // Fetch new session
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getSession();
    
    if (!error) {
      this.sessionCache = data;
      this.lastFetchTime = now;
    }
    
    return data;
  }
}

export default new SessionManager(); 