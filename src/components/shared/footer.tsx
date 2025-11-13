import Link from "next/link";

interface FooterProps {
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    menus?: Array<{ title: string; link: string }>;
    linkedIn?: string | null;
    whatsapp?: string | null;
    facebook?: string | null;
    copyright?: string | null;
    termsLink?: string | null;
    privacyLink?: string | null;
    cookiesLink?: string | null;
}

export default function Footer({ email, phone, address, menus, linkedIn, whatsapp, facebook, copyright, termsLink, privacyLink, cookiesLink }: FooterProps) {
    return (
        <footer>
            <div className="container">
                <div className="content">
                    <div>
                        {email && <div className="email">
                            <h5>Email</h5>
                            <p>{email}</p>
                        </div>}
                        {phone && (
                            <div className="phone">
                                <h5>Phone</h5>
                                <p>{phone}</p>
                            </div>
                        )}
                        {address && (
                            <div className="address">
                                <h5>Address</h5>
                                <p>{address}</p>
                            </div>
                        )}
                    </div>

                    <div className="menus">
                        <div>
                            <h3>Menu</h3>
                            <ul>
                                {menus?.map((menu) => (
                                    <li key={menu.title}>
                                        <Link href={menu.link}>{menu.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3>Social</h3>
                            <ul>
                                {true && <li>
                                    <a target="_blank" href={linkedIn || ""}>
                                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5 15.5H10C9.05719 15.5 8.58579 15.5 8.29289 15.7929C8 16.0858 8 16.5572 8 17.5V26C8 26.9428 8 27.4142 8.29289 27.7071C8.58579 28 9.05719 28 10 28H10.5C11.4428 28 11.9142 28 12.2071 27.7071C12.5 27.4142 12.5 26.9428 12.5 26V17.5C12.5 16.5572 12.5 16.0858 12.2071 15.7929C11.9142 15.5 11.4428 15.5 10.5 15.5Z" stroke="white" strokeWidth="1.5" />
                                            <path d="M12.5 10.25C12.5 11.4926 11.4926 12.5 10.25 12.5C9.00736 12.5 8 11.4926 8 10.25C8 9.00736 9.00736 8 10.25 8C11.4926 8 12.5 9.00736 12.5 10.25Z" stroke="white" strokeWidth="1.5" />
                                            <path d="M18.326 15.5H17.5C16.5572 15.5 16.0858 15.5 15.7929 15.7929C15.5 16.0858 15.5 16.5572 15.5 17.5V26C15.5 26.9428 15.5 27.4142 15.7929 27.7071C16.0858 28 16.5572 28 17.5 28H18C18.9428 28 19.4142 28 19.7071 27.7071C20 27.4142 20 26.9428 20 26L20.0001 22.5001C20.0001 20.8433 20.5281 19.5001 22.0879 19.5001C22.8677 19.5001 23.5 20.1717 23.5 21.0001V25.5001C23.5 26.4429 23.5 26.9143 23.7929 27.2072C24.0857 27.5001 24.5572 27.5001 25.5 27.5001H25.9987C26.9413 27.5001 27.4126 27.5001 27.7055 27.2073C27.9984 26.9145 27.9985 26.4432 27.9987 25.5006L28.0001 20.0002C28.0001 17.515 25.6364 15.5002 23.2968 15.5002C21.9649 15.5002 20.7767 16.1531 20.0001 17.174C20 16.5439 20 16.2289 19.8632 15.995C19.7765 15.8469 19.6531 15.7235 19.505 15.6369C19.2711 15.5 18.9561 15.5 18.326 15.5Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                                        </svg>
                                        <span>LinkedIn</span>
                                    </a>
                                </li>}
                                {true && <li>
                                    <a target="_blank" href={whatsapp || ""}>
                                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18 28C23.5228 28 28 23.5228 28 18C28 12.4771 23.5228 8 18 8C12.4771 8 8 12.4771 8 18C8 19.3789 8.27907 20.6926 8.78382 21.8877C9.06278 22.5481 9.20226 22.8784 9.21953 23.128C9.2368 23.3776 9.16334 23.6521 9.01642 24.2012L8 28L11.7988 26.9836C12.3479 26.8367 12.6224 26.7632 12.872 26.7805C13.1216 26.7977 13.4519 26.9372 14.1124 27.2162C15.3075 27.7209 16.6211 28 18 28Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                                            <path d="M14.5882 18.3773L15.4591 17.2956C15.8262 16.8397 16.2799 16.4153 16.3155 15.8083C16.3244 15.6549 16.2166 14.9666 16.0008 13.5899C15.916 13.0488 15.4109 13 14.9733 13C14.4031 13 14.1181 13 13.835 13.1293C13.4771 13.2928 13.1098 13.7523 13.0292 14.1373C12.9654 14.442 13.0128 14.6519 13.1076 15.0717C13.5102 16.8548 14.4548 18.6158 15.9195 20.0805C17.3842 21.5452 19.1452 22.4898 20.9283 22.8924C21.3481 22.9872 21.558 23.0346 21.8627 22.9708C22.2477 22.8902 22.7072 22.5229 22.8707 22.165C23 21.8819 23 21.5969 23 21.0267C23 20.5891 22.9512 20.084 22.4101 19.9992C21.0334 19.7834 20.3451 19.6756 20.1917 19.6845C19.5847 19.7201 19.1603 20.1738 18.7044 20.5409L17.6227 21.4118" stroke="white" strokeWidth="1.5" />
                                        </svg>
                                        <span>Whatsapp</span>
                                    </a>
                                </li>}
                                {true && <li>
                                    <a target="_blank" href={facebook || ""}>
                                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 18C8.5 13.5217 8.5 11.2825 9.89124 9.89124C11.2825 8.5 13.5217 8.5 18 8.5C22.4783 8.5 24.7175 8.5 26.1088 9.89124C27.5 11.2825 27.5 13.5217 27.5 18C27.5 22.4783 27.5 24.7175 26.1088 26.1088C24.7175 27.5 22.4783 27.5 18 27.5C13.5217 27.5 11.2825 27.5 9.89124 26.1088C8.5 24.7175 8.5 22.4783 8.5 18Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                                            <path d="M22.9265 14.0264H19.9816C18.9378 14.0264 18.0894 14.8685 18.0817 15.9123L17.9964 27.4268M16.082 20.0017H20.8847" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>Facebook</span>
                                    </a>
                                </li>}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="copyright">
                    <p>© {copyright}</p>
                    <div className="links">
                        <Link href={termsLink || ""}>Terms & conditions</Link>
                        <Link href={privacyLink || ""}>Privacy policy</Link>
                        <Link href={cookiesLink || ""}>Cookies preference</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}