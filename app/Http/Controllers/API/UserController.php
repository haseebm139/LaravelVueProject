<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
     /**
     * Create a new controller instance.
     *
     * @return void
     * Protected By Unauthorized User
     */
    public function __construct()
    {
        // $this->middleware('auth');
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         
        return 
         User::latest()->paginate('30');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[

            'name' => 'required|max:191|string',
            'email' => 'required|max:191|email|string|unique:users',
            'password' => 'required|min:6|',
           

        ]);
        return User::create([

            'name' => $request['name'],
            'email' => $request['email'],
            'type' => $request['type'],
            'password' => $request['password'],
            'bio' => $request['bio'],
            'photo' => Hash::make($request['photo']),

        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function profile()
    {
        return auth('api')->user();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $this->validate($request,[

            'name' => 'required|max:191|string',
            'email' => 'required|max:191|email|string|unique:users,email,'.$user->id,
            'password' => 'sometime|min:6|',
           

        ]);
        
        $user->update($request->all());
        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        // delete the user

        $user->delete();

        return ['message' => 'User Deleted '];
    }
}
