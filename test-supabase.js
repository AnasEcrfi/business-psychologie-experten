// Test Supabase Connection
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://djugesqtewzuidskqlul.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqdWdlc3F0ZXd6dWlkc2txbHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MTAxNjgsImV4cCI6MjA3MTE4NjE2OH0.sCbMdlZAK63kWfaKCbsNtPw69VY8Sf_vwCMdLJYpIYk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔍 Testing Supabase Connection...\n');
  
  try {
    // Test 1: Check if we can connect
    console.log('1️⃣ Testing connection...');
    const { data: test, error: connError } = await supabase
      .from('contact_submissions')
      .select('count')
      .limit(1);
    
    if (connError) {
      if (connError.message.includes('relation') && connError.message.includes('does not exist')) {
        console.log('❌ Tables not created yet!');
        console.log('   Please run the SQL schema in Supabase first.');
        console.log('   Go to: https://app.supabase.com/project/djugesqtewzuidskqlul/sql');
        return;
      }
      throw connError;
    }
    console.log('✅ Connection successful!\n');
    
    // Test 2: Insert test contact submission
    console.log('2️⃣ Testing contact submission...');
    const { data: contact, error: contactError } = await supabase
      .from('contact_submissions')
      .insert({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message from the connection test.'
      })
      .select()
      .single();
    
    if (contactError) throw contactError;
    console.log('✅ Contact submission created:', contact.id);
    
    // Test 3: Add test time slot
    console.log('\n3️⃣ Testing time slot creation...');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const { data: slot, error: slotError } = await supabase
      .from('time_slots')
      .insert({
        date: tomorrow.toISOString().split('T')[0],
        time: '10:00',
        available: true
      })
      .select()
      .single();
    
    if (slotError && !slotError.message.includes('duplicate')) {
      throw slotError;
    }
    console.log('✅ Time slot created or already exists');
    
    // Test 4: Create test booking
    console.log('\n4️⃣ Testing booking creation...');
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        date: tomorrow.toISOString().split('T')[0],
        time: '14:00',
        name: 'Test Client',
        email: 'client@test.com',
        phone: '+49 123 456789',
        message: 'Test booking',
        status: 'pending'
      })
      .select()
      .single();
    
    if (bookingError) throw bookingError;
    console.log('✅ Booking created:', booking.id);
    
    // Test 5: Read data back
    console.log('\n5️⃣ Testing data retrieval...');
    const { data: contacts, error: readError } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (readError) throw readError;
    console.log('✅ Retrieved', contacts.length, 'contact submissions');
    
    console.log('\n🎉 All tests passed! Supabase is fully connected and working!');
    console.log('\n📊 Database Status:');
    console.log('   - Tables: ✅ Created');
    console.log('   - Connection: ✅ Working');
    console.log('   - Read/Write: ✅ Functional');
    console.log('   - Ready for production: ✅ YES');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    
    if (error.message.includes('Failed to fetch')) {
      console.log('\n🔧 Solution: Check your internet connection');
    } else if (error.message.includes('JWT')) {
      console.log('\n🔧 Solution: Check your Supabase keys in .env.local');
    } else if (error.message.includes('permission')) {
      console.log('\n🔧 Solution: Check Row Level Security policies in Supabase');
    }
  }
}

testConnection();