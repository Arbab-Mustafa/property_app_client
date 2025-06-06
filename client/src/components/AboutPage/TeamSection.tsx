import React from "react";
import { Mail, Linkedin } from "lucide-react";
import teamImage from "../../assets/team/aaron-stevie.png";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Aaron",
      title: "Co-Founder",
      bio: "Passionate about property investment with expertise in Brazilian Jiu-Jitsu. Brings discipline and strategic thinking to every investment decision.",
      image: teamImage,
      email: "aaron@kr-properties.co.uk",
      linkedin: "https://www.linkedin.com/in/aaronremy/"
    },
    {
      name: "Stevie",
      title: "Co-Founder", 
      bio: "CrossFit and weightlifting competitor who applies the same dedication to building successful property portfolios. Focuses on client relationships and deal structuring.",
      image: teamImage,
      email: "stephanie@kr-properties.co.uk",
      linkedin: "https://www.linkedin.com/in/stephanie-kuch-7526b654/"
    }
  ];

  return (
    <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1A355E' }}>
            Meet the Founders
          </h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: '#C58B25' }}></div>
          <p className="text-xl max-w-3xl mx-auto text-base leading-relaxed" style={{ color: '#6B7280' }}>
            The experienced team behind KR Property Investments
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-1" style={{ color: '#1A355E' }}>
                  {member.name}
                </h3>
                <p className="font-medium mb-4" style={{ color: '#F97316' }}>
                  {member.title}
                </p>
              </div>
              
              <p className="mb-6 leading-relaxed text-base" style={{ color: '#6B7280' }}>
                {member.bio}
              </p>
              
              <div className="flex justify-center space-x-4">
                <a 
                  href={`mailto:${member.email}`}
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:text-white transition-colors duration-300"
                  style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', color: '#F97316' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F97316';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(249, 115, 22, 0.1)';
                    e.currentTarget.style.color = '#F97316';
                  }}
                >
                  <Mail className="h-5 w-5" />
                </a>
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:text-white transition-colors duration-300"
                  style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', color: '#F97316' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F97316';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(249, 115, 22, 0.1)';
                    e.currentTarget.style.color = '#F97316';
                  }}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;