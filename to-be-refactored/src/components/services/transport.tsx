import Image from 'next/image';

export default function Transport() {
    return (
        <div className="max-w-screen-2xl flex flex-col lg:flex-row justify-center items-center p-8 bg-ginaWhite shadow-xl">
            <Image
                src="/images/services/transport/transport.png"
                alt="Boat"
                quality={100}
                width={250}
                height={600}
                className="lg:block lg:w-1/4"
            />
            <div className="flex flex-col lg:w-1/2 justify-center items-center text-center lg:text-start mx-12 my-6 space-y-4">
                <h2 className="text-3xl lg:text-4xl font-semibold">
                    TRANSPORT
                </h2>
                <p className="text-sm lg:text-lg lg:mx-12">
                    With flexible choices tailored to your schedule and needs,
                    our transportation ensures a smooth experience, allowing you
                    to focus on exploring and enjoying your adventure without
                    the hassle.
                </p>
                <button className="px-8 py-2 rounded-xl bg-ginaBlue text-white font-bold shadow-md">
                    View More!
                </button>
            </div>
        </div>
    );
}
