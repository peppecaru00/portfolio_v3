export const metadata = {
  title: 'Start a Project | Portfolio',
  description: 'Let\'s work together on your next project',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
            Start a Project
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Tell me about your project and I'll get back to you within 24 hours.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-8">
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium tracking-wider uppercase text-neutral-500">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white outline-none transition-colors placeholder:text-neutral-400"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium tracking-wider uppercase text-neutral-500">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white outline-none transition-colors placeholder:text-neutral-400"
              />
            </div>
          </div>

          {/* Project Type */}
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium tracking-wider uppercase text-neutral-500">
              Project Type
            </label>
            <select
              id="type"
              name="type"
              required
              className="w-full px-4 py-3 bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white outline-none transition-colors cursor-pointer"
            >
              <option value="" disabled selected>Select a service</option>
              <option value="branding">Branding & Identity</option>
              <option value="web">Web Design & Development</option>
              <option value="photo">Photography</option>
              <option value="video">Video Production</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label htmlFor="budget" className="text-sm font-medium tracking-wider uppercase text-neutral-500">
              Budget Range
            </label>
            <select
              id="budget"
              name="budget"
              className="w-full px-4 py-3 bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white outline-none transition-colors cursor-pointer"
            >
              <option value="" disabled selected>Select budget range</option>
              <option value="small">$1,000 - $5,000</option>
              <option value="medium">$5,000 - $15,000</option>
              <option value="large">$15,000 - $50,000</option>
              <option value="enterprise">$50,000+</option>
            </select>
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <label htmlFor="timeline" className="text-sm font-medium tracking-wider uppercase text-neutral-500">
              Timeline
            </label>
            <input
              type="text"
              id="timeline"
              name="timeline"
              placeholder="e.g., 3 months, ASAP, Q2 2024"
              className="w-full px-4 py-3 bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white outline-none transition-colors placeholder:text-neutral-400"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium tracking-wider uppercase text-neutral-500">
              Project Details
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Tell me about your project, goals, and any specific requirements..."
              className="w-full px-4 py-3 bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white outline-none transition-colors resize-none placeholder:text-neutral-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full md:w-auto px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-medium tracking-wider uppercase overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10">Send Message</span>
            <div className="absolute inset-0 bg-neutral-800 dark:bg-neutral-200 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </form>

        {/* Alternative Contact */}
        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-sm text-neutral-500 mb-2">Prefer email?</p>
          <a 
            href="mailto:hello@yourdomain.com" 
            className="text-lg font-medium hover:opacity-60 transition-opacity"
          >
            hello@yourdomain.com
          </a>
        </div>
      </div>
    </div>
  );
}