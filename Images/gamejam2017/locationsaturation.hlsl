
float getSaturation(float3 worldPosition)
{	
    // This returns the largest sphere influence found, if 1 it's it will be fully colored
	// If 0 meaning no sphere has influenced the point.
    float result = 0;	

	// Get scalars[0] which is the x value. 
    int totalCharacters = (int)MaterialCollection0.Vectors[0].x;
	
    for (int i = 0; i < totalCharacters; i++)
    {        
        // Because Vectors[0] is occupied by the scalar values we need to do i+1 to start at Vectors[1]
        // xyz = the world position
		// w = radius of sphere
        float4 location = MaterialCollection0.Vectors[i + 1];

		// Sphere Mask by copying hlsl code from generated hlsl code from material editor		
        float3 distance = (location.rgb - worldPosition); // A - B 		
        float distanceDot = dot(distance, distance); 
        float squaredDistanceDot = sqrt(distanceDot);
        float Local4 = (squaredDistanceDot * location.a); 
        float Local5 = (1.00000000 - Local4);
        float Local6 = (Local5 * 6.66666508); // 1.0f / FMath::Max(1.0f - HardnessPercent * 0.01f, 0.00001f);  HardnessPercent = 85
        float sphereMaskValue = min(max(Local6, 0.00000000), 1.00000000); // clamp

        result = max(result, sphereMaskValue);
    }
	
    return result;
}