import Image from "next/image"

export default function Hotels() {
   return (
      <div className="flex flex-col lg:flex-row-reverse justify-center items-center py-16 bg-ginaWhite">
         <Image 
            src="/images/services/hotels/hotels.png"
            alt="Hotels"
            quality={100}
            width={250}
            height={600}
            className="lg:block lg:w-1/4"
         />
         <div className="flex flex-col lg:w-1/2 justify-center items-center text-center lg:text-start mx-12 my-6 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-semibold">HOTELS</h2>
            <p className="text-sm lg:text-lg lg:mx-12">From charming boutique hotels and eco-friendly lodges to luxurious resorts, each property is chosen for its comfort, style, and commitment to quality service.</p>
            <button className="w-36 h-10 rounded-xl bg-ginaGreen text-white font-bold shadow-md">View More!</button>
         </div>
      </div>
   )
}