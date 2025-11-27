import { TestimonialFadeInOut } from "./TestimonialFadeInOut";
export default function Testimonials({ bscstestimonials = [] }) {

    const data = bscstestimonials;

    return <>{data.length && <TestimonialFadeInOut data={data} />}</>;
}
