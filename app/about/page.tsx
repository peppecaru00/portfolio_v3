import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: 'About Me | Portfolio',
    description: 'Learn more about me and my work',
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
                {/* Profile Image */}
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0">
                    <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0">
          <Image
            src={`${basePath}/me.jpg`}
            alt="Profile photo"
            className="object-cover rounded-2xl"
            priority
            unoptimized
            width={800}
            height={1000}
          />
        </div>
                </div>

                {/* Intro Text */}
                <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
                        Hi, I'm <span className="text-neutral-500">Giuseppe Caruso</span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                        I'm a creative filmmaker based in Turin, Italy. I help people bring their visions to life through compelling visual storytelling.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="/Curriculum_Giuseppe_Caruso.pdf"
                            target="_blank"
                            className="px-6 py-3 border border-neutral-300 dark:border-neutral-700 text-sm font-medium tracking-wider uppercase rounded-full hover:border-black dark:hover:border-white transition-colors"
                        >
                            Download CV
                        </a>
                    </div>
                </div>
            </div>

            {/* Bio Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                {/* Background */}
                <div>
                    <h2 className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-4">
                       Education
                    </h2>
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                        Politecnico di Torino - Master of Science, Cinema and Media Engineering
                    </p>
                </div>

                {/* Services */}
                <div>
                    <h2 className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-4">
                        What I Do
                    </h2>
                    <ul className="space-y-4">
                        {[
                            'Video Shooting',
                            'Color Grading',
                            'Photography',
                            '3D Rendering',
                        ].map((service) => (
                            <li
                                key={service}
                                className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                                {service}
                            </li>
                        ))}
                    </ul>
                </div>


            </div>

        </div>
    );
}