import React, { useEffect, useState } from 'react';


export default function HomePage() {
    const collections = [
        { name: 'Hue', kt1: 'KT1Shm1ELtPCpZ5yaUeXJuVSek8x3UuymLuJ' },
        { name: 'YardWork', kt1: 'KT1NMayQZJMuZFTPSSskTqj82rhogNjgStSw' },
        { name: 'YY.MM.DD-@-HH.MM.SS', kt1: 'KT1FqzZT7RjgyEKAQmY46oYK4GE2hoxQGCz2' },
        { name: 'net', kt1: 'KT1BdfVyJMvFCCJd6PBzcJjPERLgXfwRiRTN' },
        { name: 'RealTime', kt1: 'KT1FqzZT7RjgyEKAQmY46oYK4GE2hoxQGCz2' },
    ]
    return (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
            
            {collections.map((collection) => (
                <div key={collection.kt1} style={{ margin: '1rem' }}>
                    <h1
                        style={{
                            fontSize: '2rem',
                            marginBottom: '1rem',
                            cursor: 'pointer',
                        }}
                        onClick={() => window.location.href = `/${collection.kt1}`}
                    >
                        {collection.name}
                    </h1>
                </div>
            ))}
        </div>
    );
}