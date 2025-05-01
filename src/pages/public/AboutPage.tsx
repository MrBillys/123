import { ShieldCheck, Wrench, TrendingUp, Users, Award, CheckCircle } from 'lucide-react';
import Button from '../../components/common/Button';

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-secondary-900 opacity-70"></div>
        <div 
          className="h-[400px] bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/3822843/pexels-photo-3822843.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)' }}
        ></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About FordPartsPro
            </h1>
            <p className="text-xl max-w-2xl">
              Greece's leading Ford parts specialist since 2005
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">Our Story</h2>
              <p className="text-secondary-700 mb-4">
                Founded in 2005 by a team of automotive enthusiasts with over 30 years of combined experience,
                FordPartsPro began as a small shop in Athens specializing in Ford vehicle repairs and parts.
              </p>
              <p className="text-secondary-700 mb-4">
                As our reputation for quality and service grew, we expanded our focus to become Greece's
                premier Ford parts supplier. Today, we serve hundreds of repair shops, dealerships, and
                individual mechanics throughout Greece and the Balkans.
              </p>
              <p className="text-secondary-700 mb-4">
                Our mission is simple: provide high-quality Ford parts at competitive prices with exceptional
                service. We maintain a vast inventory of genuine and reliable aftermarket parts, ensuring
                quick delivery and technical support.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                alt="Warehouse" 
                className="rounded-lg object-cover h-full"
              />
              <img 
                src="https://images.pexels.com/photos/3822843/pexels-photo-3822843.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                alt="Parts" 
                className="rounded-lg object-cover h-full"
              />
              <img 
                src="https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                alt="Engine parts" 
                className="rounded-lg object-cover h-full"
              />
              <img 
                src="https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                alt="Tools" 
                className="rounded-lg object-cover h-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900">Our Values</h2>
            <p className="mt-4 text-xl text-secondary-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-primary-600 mb-4">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-secondary-700">
                We never compromise on the quality of our parts, offering only items that meet or exceed
                manufacturer specifications.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-primary-600 mb-4">
                <Wrench size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Technical Expertise</h3>
              <p className="text-secondary-700">
                Our team includes Ford-certified technicians who can provide expert advice and ensure you get the right part.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-primary-600 mb-4">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Continuous Improvement</h3>
              <p className="text-secondary-700">
                We constantly update our inventory and knowledge to keep pace with the latest Ford models and technologies.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-primary-600 mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Partnership</h3>
              <p className="text-secondary-700">
                We see our customers as long-term partners and work to understand and meet their unique needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-primary-600 mb-4">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliability</h3>
              <p className="text-secondary-700">
                We pride ourselves on reliable delivery, consistent pricing, and being there when our customers need us.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-primary-600 mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-secondary-700">
                We operate with transparency and fairness in all our business practices, building trust with every interaction.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900">Our Team</h2>
            <p className="mt-4 text-xl text-secondary-600 max-w-3xl mx-auto">
              Meet the experts behind FordPartsPro
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Georgios Papadopoulos"
                  className="w-32 h-32 object-cover rounded-full mx-auto"
                />
              </div>
              <h3 className="text-xl font-semibold">Georgios Papadopoulos</h3>
              <p className="text-primary-600 font-medium">Founder & CEO</p>
              <p className="mt-2 text-secondary-700">
                30+ years experience in automotive parts and Ford specialist
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4">
                <img
                  src="https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Maria Dimitriou"
                  className="w-32 h-32 object-cover rounded-full mx-auto"
                />
              </div>
              <h3 className="text-xl font-semibold">Maria Dimitriou</h3>
              <p className="text-primary-600 font-medium">Operations Manager</p>
              <p className="mt-2 text-secondary-700">
                Expert in supply chain optimization and inventory management
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4">
                <img
                  src="https://images.pexels.com/photos/3190334/pexels-photo-3190334.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Andreas Nikolaou"
                  className="w-32 h-32 object-cover rounded-full mx-auto"
                />
              </div>
              <h3 className="text-xl font-semibold">Andreas Nikolaou</h3>
              <p className="text-primary-600 font-medium">Technical Director</p>
              <p className="mt-2 text-secondary-700">
                Ford-certified master technician with 15+ years experience
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Partner With Us Today</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join hundreds of satisfied customers who trust FordPartsPro for all their Ford parts needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              to="/b2b"
              className="text-white border-white hover:bg-white hover:text-primary-600"
            >
              B2B Partnership
            </Button>
            <Button
              variant="primary"
              size="lg"
              to="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;