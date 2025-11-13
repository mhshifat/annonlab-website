interface StatsProps {
    yearsInBusiness: string;
    productsOwned: string;
    completedProjects: string;
    countriesServed: string;
}

export default function Stats({ yearsInBusiness, productsOwned, completedProjects, countriesServed }: StatsProps) {
    return (
        <section className="stats">
            <div className="container">
                <div>
                    <span>{yearsInBusiness}</span>
                    <span>Years in business</span>
                </div>
                <div>
                    <span>{productsOwned}</span>
                    <span>Products owned</span>
                </div>
                <div>
                    <span>{completedProjects}</span>
                    <span>Completed projects</span>
                </div>
                <div>
                    <span>{countriesServed}</span>
                    <span>Countries served</span>
                </div>
            </div>
        </section>
    )
}