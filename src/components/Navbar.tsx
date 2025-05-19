
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  ShoppingCart, 
  LogIn, 
  UserPlus,
  User,
  Package,
  LogOut
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
 const { logout,authToken,username} = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignInClick = () => {
    navigate('/signin');
    setIsMenuOpen(false);
  };

  const handleSignUpClick = () => {
    navigate('/signup');
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      toast.success("Signed out successfully");
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error("Error signing out. Please try again.");
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/e97663ed-a50f-4c0a-abcc-4a0e09f9e2ac.png" 
            alt="Refreshment Company Logo" 
            className="h-12 mr-3" 
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-poppins font-medium hover:text-brand-blue transition-colors">Home</Link>
          <Link to="/about" className="font-poppins font-medium hover:text-brand-blue transition-colors">About</Link>
          <Link to="/services" className="font-poppins font-medium hover:text-brand-blue transition-colors">Services</Link>
          <Link to="/contact" className="font-poppins font-medium hover:text-brand-blue transition-colors">Contact</Link>
          {username && (
            <>
              <Link to="/profile" className="font-poppins font-medium hover:text-brand-blue transition-colors">Profile</Link>
              <Link to="/vendor" className="font-poppins font-medium hover:text-brand-blue transition-colors flex items-center gap-1">
                <Package size={16} />
                Vendor
              </Link>
            </>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {
            username ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <User size={16} />
                    {username}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <User size={16} />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignInClick} className="cursor-pointer">
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Sign In</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignUpClick} className="cursor-pointer">
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Sign Up</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          }
          <Link to="/order">
            <Button className="bg-brand-blue hover:bg-brand-blue/90 flex items-center gap-2">
              <ShoppingCart size={16} /> Pre-Order
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-black" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="font-poppins font-medium py-2 hover:text-brand-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="font-poppins font-medium py-2 hover:text-brand-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className="font-poppins font-medium py-2 hover:text-brand-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="font-poppins font-medium py-2 hover:text-brand-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {username && (
              <>
                <Link
                  to="/profile"
                  className="font-poppins font-medium py-2 hover:text-brand-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/vendor"
                  className="font-poppins font-medium py-2 hover:text-brand-blue transition-colors flex items-center gap-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package size={16} />
                  Vendor Dashboard
                </Link>
              </>
            )}
            <div className="flex flex-col space-y-2 pt-2 border-t">
              {
                username ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full justify-center flex items-center gap-2"
                      onClick={handleProfileClick}
                    >
                      <User size={16} />
                      My Profile
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full justify-center flex items-center gap-2"
                      onClick={handleSignOut}
                    >
                      <LogOut size={16} />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full justify-center flex items-center gap-2"
                      onClick={handleSignInClick}
                    >
                      <LogIn size={16} />
                      Sign In
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full justify-center flex items-center gap-2"
                      onClick={handleSignUpClick}
                    >
                      <UserPlus size={16} />
                      Sign Up
                    </Button>
                  </>
                )
              }
              <Link to="/order" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 justify-center flex items-center gap-2">
                  <ShoppingCart size={16} />
                  Pre-Order Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
