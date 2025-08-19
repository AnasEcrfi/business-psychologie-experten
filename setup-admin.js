// Setup Admin User in Supabase Auth
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://djugesqtewzuidskqlul.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqdWdlc3F0ZXd6dWlkc2txbHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MTAxNjgsImV4cCI6MjA3MTE4NjE2OH0.sCbMdlZAK63kWfaKCbsNtPw69VY8Sf_vwCMdLJYpIYk';

// Use anon key for normal operations
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupAdmin() {
  console.log('🔐 Setting up Admin User in Supabase Auth\n');
  console.log('='.repeat(50));
  
  const adminEmail = 'admin@businesspsychologie.de';
  const adminPassword = 'admin123'; // Change this in production!
  
  try {
    // Try to sign up first
    console.log('1️⃣ Attempting to create admin user...');
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
      options: {
        data: {
          role: 'admin'
        }
      }
    });
    
    if (signUpError) {
      // If user already exists, try to sign in
      if (signUpError.message.includes('already registered')) {
        console.log('⚠️  User already exists, attempting to sign in...');
        
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password: adminPassword
        });
        
        if (signInError) {
          console.error('❌ Sign in failed:', signInError.message);
          return;
        }
        
        console.log('✅ Successfully signed in existing admin user!');
        console.log('   Email:', adminEmail);
        if (signInData.session) {
          console.log('   Session ID:', signInData.session.access_token.substring(0, 20) + '...');
        }
      } else {
        console.error('❌ Sign up failed:', signUpError.message);
        return;
      }
    } else {
      console.log('✅ Admin user created successfully!');
      if (signUpData.user) {
        console.log('   ID:', signUpData.user.id);
        console.log('   Email:', signUpData.user.email);
      }
      
      // Test sign in with new user
      console.log('\n2️⃣ Testing admin login...');
      const { data: session, error: signInError } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword
      });
      
      if (signInError) {
        console.error('❌ Login test failed:', signInError.message);
      } else {
        console.log('✅ Login successful!');
        if (session.session) {
          console.log('   Session ID:', session.session.access_token.substring(0, 20) + '...');
        }
      }
    }
    
    // Sign out
    await supabase.auth.signOut();
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 ADMIN SETUP COMPLETE!');
    console.log('='.repeat(50));
    console.log('\n📝 Admin Credentials:');
    console.log('   Email: ' + adminEmail);
    console.log('   Password: ' + adminPassword);
    console.log('\n⚠️  IMPORTANT: Change the password in production!');
    console.log('\n✅ You can now login at: http://localhost:3003/admin');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
  }
}

setupAdmin();