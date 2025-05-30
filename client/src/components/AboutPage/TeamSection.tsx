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
      linkedin: "#"
    },
    {
      name: "Stevie",
      title: "Co-Founder", 
      bio: "CrossFit and weightlifting competitor who applies the same dedication to building successful property portfolios. Focuses on client relationships and deal structuring.",
      image: teamImage,
      email: "stevie@kr-properties.co.uk",
      linkedin: "#"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet the Founders
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-4">
                  {member.title}
                </p>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {member.bio}
              </p>
              
              <div className="flex justify-center space-x-4">
                <a 
                  href={`mailto:${member.email}`}
                  className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  <Mail className="h-5 w-5" />
                </a>
                <a 
                  href={member.linkedin}
                  className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
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