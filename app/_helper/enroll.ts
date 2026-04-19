// Export separate functions for each payment method
export async function enrollVodafone(courseid: string, token: string, transactionId?: string) {
    const response = await fetch('https://educational-platform-api2-production-c85a.up.railway.app/api/enrollments/purchase/' + courseid, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            paymentMethod: 'vodafone_cash',
            transactionId: transactionId
        })
    });
    return await response.json();
}