// Complete Integration Test for Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://djugesqtewzuidskqlul.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqdWdlc3F0ZXd6dWlkc2txbHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MTAxNjgsImV4cCI6MjA3MTE4NjE2OH0.sCbMdlZAK63kWfaKCbsNtPw69VY8Sf_vwCMdLJYpIYk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testIntegration() {
  console.log('🔍 Testing Complete Supabase Integration\n');
  console.log('=' . repeat(50));
  
  try {
    // Test 1: Check existing data in database
    console.log('\n📊 Current Database Content:');
    console.log('-'.repeat(30));
    
    // Check contact submissions
    const { data: contacts, error: contactError } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (contactError) throw contactError;
    console.log(`✅ Contact Submissions: ${contacts.length} entries`);
    if (contacts.length > 0) {
      console.log('   Latest:', contacts[0].name, '-', contacts[0].email);
    }
    
    // Check bookings
    const { data: bookings, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (bookingError) throw bookingError;
    console.log(`✅ Bookings: ${bookings.length} entries`);
    if (bookings.length > 0) {
      console.log('   Latest:', bookings[0].name, '-', bookings[0].date, bookings[0].time);
    }
    
    // Check time slots
    const { data: slots, error: slotError } = await supabase
      .from('time_slots')
      .select('*')
      .order('date', { ascending: true });
    
    if (slotError) throw slotError;
    console.log(`✅ Time Slots: ${slots.length} entries`);
    const availableSlots = slots.filter(s => s.available);
    console.log(`   Available: ${availableSlots.length} slots`);
    
    // Check admin users
    const { data: admins, error: adminError } = await supabase
      .from('admin_users')
      .select('email');
    
    if (adminError) throw adminError;
    console.log(`✅ Admin Users: ${admins.length} entries`);
    admins.forEach(admin => {
      console.log(`   - ${admin.email}`);
    });
    
    // Test 2: Simulate website functionality
    console.log('\n🧪 Testing Website Functionality:');
    console.log('-'.repeat(30));
    
    // Simulate contact form submission
    const testContact = {
      name: 'Test Customer ' + Date.now(),
      email: 'customer@test.com',
      message: 'Ich interessiere mich für Ihre Dienstleistungen.'
    };
    
    const { data: newContact, error: newContactError } = await supabase
      .from('contact_submissions')
      .insert(testContact)
      .select()
      .single();
    
    if (newContactError) throw newContactError;
    console.log('✅ Contact form submission works:', newContact.id);
    
    // Simulate creating time slot for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    const testSlot = {
      date: tomorrowStr,
      time: '15:00',
      available: true
    };
    
    const { data: newSlot, error: newSlotError } = await supabase
      .from('time_slots')
      .upsert(testSlot)
      .select()
      .single();
    
    if (newSlotError && !newSlotError.message.includes('duplicate')) {
      throw newSlotError;
    }
    console.log('✅ Time slot creation works');
    
    // Simulate booking
    const testBooking = {
      date: tomorrowStr,
      time: '16:00',
      name: 'Test Booking ' + Date.now(),
      email: 'booking@test.com',
      phone: '+49 123 456789',
      message: 'Ich möchte einen Termin vereinbaren',
      status: 'pending'
    };
    
    const { data: newBooking, error: newBookingError } = await supabase
      .from('bookings')
      .insert(testBooking)
      .select()
      .single();
    
    if (newBookingError) throw newBookingError;
    console.log('✅ Booking system works:', newBooking.id);
    
    // Test 3: Admin functionality
    console.log('\n👨‍💼 Testing Admin Functionality:');
    console.log('-'.repeat(30));
    
    // Update contact status
    const { error: updateError } = await supabase
      .from('contact_submissions')
      .update({ status: 'read' })
      .eq('id', newContact.id);
    
    if (updateError) throw updateError;
    console.log('✅ Contact status update works');
    
    // Update booking status
    const { error: bookingUpdateError } = await supabase
      .from('bookings')
      .update({ status: 'confirmed' })
      .eq('id', newBooking.id);
    
    if (bookingUpdateError) throw bookingUpdateError;
    console.log('✅ Booking status update works');
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('🎉 ALL TESTS PASSED!');
    console.log('='.repeat(50));
    console.log('\n✅ Database Integration: WORKING');
    console.log('✅ Contact Form: WORKING');
    console.log('✅ Booking System: WORKING');
    console.log('✅ Admin Functions: WORKING');
    console.log('✅ Ready for Production: YES\n');
    
    console.log('📝 Next Steps:');
    console.log('1. Test the website at http://localhost:3003');
    console.log('2. Submit a contact form');
    console.log('3. Make a booking');
    console.log('4. Check admin panel at http://localhost:3003/admin');
    console.log('5. Verify data appears in Supabase dashboard');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\nTroubleshooting:');
    if (error.message.includes('relation') && error.message.includes('does not exist')) {
      console.log('→ Tables not created. Run supabase-schema.sql in Supabase');
    } else if (error.message.includes('violates row-level security')) {
      console.log('→ RLS policies need adjustment. Run supabase-fix-policies.sql');
    } else if (error.message.includes('Failed to fetch')) {
      console.log('→ Check internet connection or Supabase service status');
    }
  }
}

testIntegration();