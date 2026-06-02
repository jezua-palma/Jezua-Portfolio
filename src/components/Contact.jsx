import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, Mail, MapPin, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Hire Me',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitting: false,
    success: null,
    message: ''
  });

  // 📝 Web3Forms Access Key: Kumuha ng access key sa https://web3forms.com/ gamit ang iyong email (jezuapalma@gmail.com)
  const WEB3FORMS_ACCESS_KEY = 'ca6e8497-a5a9-4bbd-90cf-710c06896b1f';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validations
    if (!formData.name || !formData.email || !formData.message) {
      showFeedback(false, 'Please fill out all required fields.');
      return;
    }

    setStatus({ submitting: true, success: null, message: '' });

    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
      // Fallback to mailto link directly if the key is not set
      const mailtoUrl = `mailto:jezuapalma@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} <${formData.email}>\n\n${formData.message}`)}`;
      window.location.href = mailtoUrl;
      showFeedback(true, 'Opening your local email client to complete submission (Access Key not set).');
      setStatus({ submitting: false, success: true, message: 'Redirected to local email application.' });
      return;
    }

    // Send email using Web3Forms API
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: formData.name,
        email: formData.email,
        subject: `New Portfolio Inquiry: ${formData.subject} from ${formData.name}`,
        message: formData.message,
        from_name: 'Jezua dev Portfolio'
      })
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        showFeedback(true, 'Message sent successfully! I will reach back to you shortly.');
        setFormData({ name: '', email: '', subject: 'Hire Me', message: '' });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    })
    .catch((error) => {
      console.error('Web3Forms error:', error);
      
      // Fallback to mailto link
      const mailtoUrl = `mailto:jezuapalma@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} <${formData.email}>\n\n${formData.message}`)}`;
      window.location.href = mailtoUrl;
      showFeedback(true, 'Opening your local email client to complete submission.');
      setStatus({ submitting: false, success: true, message: 'Redirected to local email application.' });
    });
  };

  const showFeedback = (isSuccess, text) => {
    setStatus({
      submitting: false,
      success: isSuccess,
      message: text
    });
    
    // Auto clear toast after 5 seconds
    setTimeout(() => {
      setStatus(prev => ({ ...prev, success: null, message: '' }));
    }, 5000);
  };

  return (
    <section id="contact" className="relative py-24 border-t border-white/5 overflow-hidden">
      <div className="glow-sphere w-[500px] h-[500px] bg-neon-indigo/5 top-20 right-10" />

      {/* Global Status Toast Alert */}
      <AnimatePresence>
        {status.message && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className={`fixed top-24 right-4 sm:right-10 z-50 p-4 rounded-xl border shadow-2xl flex items-center space-x-3 w-full max-w-sm font-sans ${
              status.success 
                ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-300' 
                : 'bg-rose-950/90 border-rose-500/30 text-rose-300'
            }`}
          >
            {status.success ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
            )}
            <span className="text-xs sm:text-sm font-medium leading-relaxed">{status.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <div className="mt-2 text-sm text-gray-500 font-mono">
            GET IN TOUCH FOR JOB APPLICATIONS OR FREELANCE
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-cyan to-neon-violet mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Quick Contact Info Cards (Left) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Availability Widget */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group select-none">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
              <div className="flex items-center space-x-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <div>
                  <h4 className="text-sm font-extrabold text-white leading-tight">Current Availability</h4>
                  <p className="text-xs text-gray-500 mt-0.5 leading-normal">Open to full-time engineering and visual custom systems inquiries.</p>
                </div>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
              
              {/* Mail */}
              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-neon-cyan group-hover:border-neon-cyan/30 transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">Direct Email</span>
                  <a href="mailto:jezuapalma@gmail.com" className="block text-sm sm:text-base font-bold text-white hover:text-neon-cyan transition-colors mt-0.5">
                    jezuapalma@gmail.com
                  </a>
                </div>
              </div>

              {/* Call */}
              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-neon-violet group-hover:border-neon-violet/30 transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">Direct Phone Call</span>
                  <div className="space-y-1 mt-0.5 text-sm sm:text-base font-bold text-white">
                    <a href="tel:+639397832375" className="block hover:text-neon-violet transition-colors">
                      +63 939 783 2375
                    </a>
                    <a href="tel:+639566723696" className="block hover:text-neon-violet transition-colors">
                      +63 956 672 3696
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-neon-fuchsia group-hover:border-neon-fuchsia/30 transition-all duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">Location Coordinates</span>
                  <p className="text-sm sm:text-base font-bold text-white mt-0.5 leading-tight">
                    M. Pandeno St. Siniloan, Laguna, Philippines
                  </p>
                  <span className="text-[10px] text-gray-500 mt-1 block">Remote & Hybrid Ready</span>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Form Panel (Right) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-2xl border border-white/5 shadow-xl relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Sender Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs sm:text-sm font-semibold text-gray-300">
                      Your Name <span className="text-neon-rose">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Recruiter Name"
                      className="w-full glass-input"
                      required
                    />
                  </div>

                  {/* Sender Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs sm:text-sm font-semibold text-gray-300">
                      Your Email <span className="text-neon-rose">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="hiring@company.com"
                      className="w-full glass-input"
                      required
                    />
                  </div>

                </div>

                {/* Subject Selection Category */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs sm:text-sm font-semibold text-gray-300">
                    Inquiry Reason
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full glass-input appearance-none bg-[#0b0825] cursor-pointer"
                  >
                    <option value="Hire Me">Full-Time Job Hiring Opportunity</option>
                    <option value="Freelance Project">Freelance Visual System Request</option>
                    <option value="Business Inquiry">General Business Collaboration</option>
                    <option value="General Question">Quick Developer Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs sm:text-sm font-semibold text-gray-300">
                    Your Message <span className="text-neon-rose">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, timeline, or open role..."
                    rows="6"
                    className="w-full glass-input resize-none"
                    required
                  ></textarea>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full py-4 rounded-xl gradient-btn flex items-center justify-center space-x-2 font-bold text-sm sm:text-base disabled:opacity-50 select-none shadow-[0_4px_20px_rgba(99,102,241,0.2)]"
                >
                  {status.submitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#030014] fill-current" />
                      <span className="text-[#030014]">Send Inquiry Details</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
