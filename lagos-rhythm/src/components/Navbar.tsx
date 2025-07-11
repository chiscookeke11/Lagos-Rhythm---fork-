"use client"



import Link from "next/link"
import Button from "./common/Button"
import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion";




const navLinks = [
    {
        label: "HOME",
        path: "/",
    },
    {
        label: "VIRTUAL TOUR",
        path: "/VirtualTour",
    },
    {
        label: "IN-PERSON TOUR",
        path: "/InPersonTour",
    },
    {
        label: "FLIGHTS",
        path: "/Flights",
    },
    {
        label: "STORE",
        path: "/store",
    },
]




export default function Navbar() {
    const [openMobileNav, setOpenMobileNav] = useState(false)
    const [scrolled, setScrolled] = useState(false);
    const mobileNavRef = useRef<HTMLDivElement>(null)



    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 50);
        }

        window.addEventListener("scroll", handleScroll)


        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])


    useEffect(() => {
        document.body.style.overflow = openMobileNav ? "hidden" : "auto";


        const handleClickOutside  = (e: MouseEvent) => {
            if (
                mobileNavRef.current && !mobileNavRef.current.contains(e.target as Node)
            ) {
                setOpenMobileNav(false)
            }
        }
        if (openMobileNav) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.body.style.overflow = "auto"
        }
    }, [openMobileNav]);



    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between gap-10 py-3 px-[4%] transition-colors duration-150 ease-in-out font-signika z-50 ${scrolled ? "bg-[#EF8F57] " : "bg-transparent"} `}  >



            <div className=" w-fit flex items-center justify-center gap-20" >
                <Image src={"/logos/logo.png"} height={100} width={100} alt="logo" className=" w-[50px] " />



                <ul className=" hidden w-fit lg:flex items-center justify-evenly gap-10" >
                    {
                        navLinks.map((navLink, index) => (
                            <Link href={navLink.path} key={index} ><li className={`font-normal text-base text-[#FFFFFF]  transition-colors duration-150 ease-in-out cursor-pointer ${scrolled ? " hover:text-gray-300 " : "hover:text-[#EB662B]"}  `} > {navLink.label} </li></Link>
                        ))
                    }
                </ul>

            </div>


            <div className=" flex items-center justify-center gap-7 w-fit" >


                <Link href={"/"} ><button aria-label="Sign Up" className=" font-normal text-base text-[#FFFFFF] hover:text-[#EB662B] transition-colors duration-150 ease-in-out cursor-pointer hidden lg:block font-signika ">Sign up</button></Link>

                <Button label="Log in" type="button" variant="outline" className="font-signika !py-2 hover:scale-105 transform transition-transform duration-150 ease-in-out " ariaLabel="Log In" />

                <button aria-label="Open Menu" className=" cursor-pointer flex lg:hidden " onClick={() => setOpenMobileNav(true)}  ><Menu size={30} color="#ffffff" /> </button>

            </div>




{/* mobile nav  */}
            <div ref={mobileNavRef} className={`w-full h-fit bg-[#ffffff] fixed top-0 left-0 transform transition-transform duration-150 ease-in-out  ${openMobileNav ? "translate-y-0" : "translate-y-[-100%]"}   `} >
                <div className="w-full h-full  relative flex items-center justify-center " >
                    <button aria-label="Close Menu" onClick={() => setOpenMobileNav(false)} className="absolute top-[5%] right-[5%] cursor-pointer   p-1 flex items-center justify-center   " > <X size={30} color="#EF8F57" /> </button>




                    <ul className=" w-full h-full justify-center flex flex-col items-start gap-5  py-12 px-6 "   >
                        {navLinks.map((navLink, index) => (
                            <motion.li
                                initial={{scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.05, type: "spring", stiffness: 100, damping: 15, }}
                                viewport={{ amount: 0.1 }}
                                onClick={() => setOpenMobileNav(false)}
                                key={index} className={` font-normal text-base text-black  transition-colors duration-150 ease-in-out cursor-pointer ${scrolled ? " hover:text-gray-300 " : "hover:text-[#EB662B]"} `} > <Link href={navLink.path}  > {navLink.label}</Link> </motion.li>
                        ))}
                    </ul>
                </div>






            </div>



        </nav>
    )
}